from AlgorithmImports import *
import numpy as np

class MultiAssetPortfolioOptimization(QCAlgorithm):

    def Initialize(self):
        # Backtest period: for accurate Q2 2025 use Q1/Q2 2018
        # for 2018-1-1 to 2025-1-1 total return of SPY is +149%
        self.SetStartDate(2010, 1, 1)
        self.SetEndDate(2025, 1, 1)
        self.SetCash(100000)
        
        # Define long asset group: SPY, all S&P sector ETFs, plus some commodities
        self.longAssets = {}
        
        # S&P 500
        #self.longAssets["SPY"]   = self.AddEquity("SPY",  Resolution.Daily).Symbol
        self.longAssets["SPXL"]   = self.AddEquity("SPXL",  Resolution.Daily).Symbol # leveraged SPY ###

        # S&P Sector ETFs
        #self.longAssets["XLC"]   = self.AddEquity("XLC",  Resolution.Daily).Symbol  # Communication Services
        #self.longAssets["XLY"]   = self.AddEquity("XLY",  Resolution.Daily).Symbol  # Consumer Discretionary
        self.longAssets["WANT"]   = self.AddEquity("WANT",  Resolution.Daily).Symbol # leveraged consumer ###
        #self.longAssets["XLP"]   = self.AddEquity("XLP",  Resolution.Daily).Symbol  # Consumer Staples
        #self.longAssets["XLE"]   = self.AddEquity("XLE",  Resolution.Daily).Symbol  # Energy
        #self.longAssets["XLF"]   = self.AddEquity("XLF",  Resolution.Daily).Symbol  # Financials
        self.longAssets["FAS"]   = self.AddEquity("FAS",  Resolution.Daily).Symbol   # leveraged financials ###
        #self.longAssets["XLV"]   = self.AddEquity("XLV",  Resolution.Daily).Symbol  # Health Care
        #self.longAssets["XLI"]   = self.AddEquity("XLI",  Resolution.Daily).Symbol  # Industrials
        #self.longAssets["XLB"]   = self.AddEquity("XLB",  Resolution.Daily).Symbol  # Materials
        self.longAssets["DUSL"]   = self.AddEquity("DUSL",  Resolution.Daily).Symbol # leveraged US manufacturing ###
        #self.longAssets["XLRE"]  = self.AddEquity("XLRE", Resolution.Daily).Symbol  # Real Estate
        #self.longAssets["XLK"]   = self.AddEquity("XLK",  Resolution.Daily).Symbol  # Technology
        #self.longAssets["XLU"]   = self.AddEquity("XLU",  Resolution.Daily).Symbol  # Utilities
        self.longAssets["TECL"]   = self.AddEquity("TECL",  Resolution.Daily).Symbol # leveraged tech ###
        self.longAssets["DFEN"]   = self.AddEquity("DFEN",  Resolution.Daily).Symbol # leveraged defense ###
        #self.longAssets["PILL"]   = self.AddEquity("PILL",  Resolution.Daily).Symbol # leveraged pharma ###
        #self.longAssets["CURE"]   = self.AddEquity("CURE",  Resolution.Daily).Symbol # leveraged healthcare ###
        
        # Commodities
        #self.longAssets["GLD"]   = self.AddEquity("GLD",  Resolution.Daily).Symbol  # Gold
        #self.longAssets["NUGT"]   = self.AddEquity("NUGT",  Resolution.Daily).Symbol # leveraged gold ###
        #self.longAssets["USO"]   = self.AddEquity("USO",  Resolution.Daily).Symbol  # Oil
        #self.longAssets["GUSH"]   = self.AddEquity("GUSH",  Resolution.Daily).Symbol # leveraged oil ###
        #self.longAssets["SLV"]   = self.AddEquity("SLV",  Resolution.Daily).Symbol  # Silver
        #self.longAssets["AGQ"]   = self.AddEquity("AGQ",  Resolution.Daily).Symbol   # leveraged silver ###
        
        # Set moving average period (5-day SMA in this example)
        self.maPeriod = 20
        self.smaDict = {}
        for asset in list(self.longAssets.values()):
            self.smaDict[asset] = self.SMA(asset, self.maPeriod, Resolution.Daily)
        
        # Set warmup period so all SMA indicators are ready
        self.SetWarmUp(self.maPeriod)
        
        # Stop loss and take profit percentages for equities/commodities default: 0.02 and 0.08
        self.StopLossPctEquity = 0.06
        self.TakeProfitPctEquity = 0.20
        
        # Use 100% of capital for long positions
        self.longAllocation = 1.0
        
        # Dictionaries to track stop/take-profit orders and entry prices
        self.ordersDict = {}
        self.entryPrices = {}
        
    def OnData(self, data):
        # Skip if warming up
        if self.IsWarmingUp:
            return
        
        # Identify signals
        longSignals = {}
        
        # If price > SMA, we signal a long
        for name, symbol in self.longAssets.items():
            if data.ContainsKey(symbol) and data[symbol]:
                price = data[symbol].Price
                sma   = self.smaDict[symbol].Current.Value
                if price > sma:
                    vol = self.CalculateVolatility(symbol)
                    if vol is None or vol <= 0:
                        vol = 0.001
                    longSignals[symbol] = vol
                else:
                    # Liquidate if signal fails
                    if self.Portfolio[symbol].Invested:
                        self.Liquidate(symbol)
                        self.CancelOrdersForSymbol(symbol)
        
        # Inverse-volatility weighting among signals
        if longSignals:
            invVolSum = sum(1 / vol for vol in longSignals.values())
            for symbol, vol in longSignals.items():
                weight = self.longAllocation * ((1 / vol) / invVolSum)
                self.SetHoldings(symbol, weight)
                
                # Place stop/take profit orders if newly entered
                if self.Portfolio[symbol].Invested and symbol not in self.ordersDict:
                    self.entryPrices[symbol] = data[symbol].Price
                    self.PlaceStopAndTakeProfit(symbol, data[symbol].Price, 
                                                long=True,
                                                stopPct=self.StopLossPctEquity, 
                                                tpPct=self.TakeProfitPctEquity)
        
    def CalculateVolatility(self, symbol):
        # Use 'maPeriod' days of history for volatility
        history = self.History(symbol, self.maPeriod, Resolution.Daily)
        if history.empty:
            return None
        try:
            # For equities, history is keyed by symbol
            prices = history.loc[symbol]['close'].values
        except Exception:
            prices = history['close'].values
        if len(prices) < 2:
            return None
        
        returns = np.diff(prices) / prices[:-1]
        vol = np.std(returns)
        return vol

    def PlaceStopAndTakeProfit(self, symbol, entryPrice, long, stopPct, tpPct):
        # Cancel any existing orders for this symbol
        self.CancelOrdersForSymbol(symbol)
        
        if long:
            stopPrice = entryPrice * (1 - stopPct)
            tpPrice   = entryPrice * (1 + tpPct)
        else:
            stopPrice = entryPrice * (1 + stopPct)
            tpPrice   = entryPrice * (1 - tpPct)
        
        # Determine quantity to close the position
        quantity = self.Portfolio[symbol].Quantity
        closeQuantity = -quantity
        
        stopTicket = self.StopMarketOrder(symbol, closeQuantity, stopPrice)
        tpTicket   = self.LimitOrder(symbol, closeQuantity, tpPrice)
        
        self.ordersDict[symbol] = {"stop": stopTicket, "tp": tpTicket}
        self.Debug(f"{symbol.Value}: Entry={entryPrice:.2f}, Stop={stopPrice:.2f}, TP={tpPrice:.2f}")
        
    def CancelOrdersForSymbol(self, symbol):
        if symbol in self.ordersDict:
            orders = self.ordersDict[symbol]
            if orders["stop"] is not None:
                self.Transactions.CancelOrder(orders["stop"].OrderId)
            if orders["tp"] is not None:
                self.Transactions.CancelOrder(orders["tp"].OrderId)
            del self.ordersDict[symbol]
            
    def OnOrderEvent(self, orderEvent):
        if orderEvent.Status == OrderStatus.Filled:
            # When a stop or take profit order is filled, cancel the other order
            for symbol, orders in list(self.ordersDict.items()):
                if orderEvent.OrderId in [orders["stop"].OrderId, orders["tp"].OrderId]:
                    self.CancelOrdersForSymbol(symbol)
                    self.Debug(f"Exit order filled for {symbol.Value}. Cancelling remaining exit order.")