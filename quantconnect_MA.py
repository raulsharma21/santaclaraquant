# Santa Clara Quant Winter Workshop
# Moving Average Crossover Strategy for QuantConnect

# region imports
from AlgorithmImports import *
from datetime import timedelta
# endregion

class QuantLeague(QCAlgorithm):
    def initialize(self):
        self.set_start_date(2020, 1, 1)
        self.set_end_date(2024, 1, 1)
        self.INIT_CASH = 1000000
        self.set_cash(self.INIT_CASH)

        # Warm up the algorithm with historical data
        self.set_warm_up(timedelta(days=20))

        self.symbol = self.add_equity("SPY", Resolution.Daily).Symbol
        self.initialized = False

        self.fast_ma = self.sma(self.symbol, 3, Resolution.Daily)
        self.slow_ma = self.sma(self.symbol, 20, Resolution.Daily)

        self.invested = False
        self.buy_order_sent = False

    def on_data(self, data):      
        if self.is_warming_up:
            return

        if not self.initialized:
            self.buy_and_hold_shares = self.INIT_CASH / self.Securities[self.symbol].Price
            print(self.buy_and_hold_shares)
            self.initialized = True

        print(self.fast_ma)
        print(self.slow_ma)

        self.UpdatePlot()

        if not self.invested and self.fast_ma > self.slow_ma:
            quantity = self.CalculateOrderQuantity(self.symbol, 1)
            self.market_order(self.symbol, quantity)
            self.invested = True

        if self.invested and self.fast_ma < self.slow_ma:
            self.liquidate()
            self.invested = False
    

    def UpdatePlot(self):

        # Updating the Performance chart
        # Plot the moving averages
        self.Plot("Performance", "3-Day", self.fast_ma.Current.Value)
        self.Plot("Performance", "20-Day", self.slow_ma.Current.Value)
        # Plot the total portfolio value
        self.Plot("Performance", "Total Value", self.Portfolio.TotalPortfolioValue)
        #Plot the benchmark
        benchmark = self.Securities[self.symbol].Price
        self.Plot("Performance", "Buy and Hold", benchmark * self.buy_and_hold_shares)


        # Updating the Moving Average Chart
        # Plot the moving averages
        self.plot('Moving Averages', '3-day', self.fast_ma.Current.Value)
        self.plot('Moving Averages', '20-day', self.slow_ma.Current.Value)
    
