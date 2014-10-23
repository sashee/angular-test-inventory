# Rubygems and Bundler
require "rubygems"
require "bundler/setup"

# Gems
require "selenium-webdriver"
require "test/unit/assertions"
require "cucumber"
require "require_all"


# Setup Browser
driver = Selenium::WebDriver.for :firefox
driver.manage.timeouts.implicit_wait = 1 # seconds
driver.get "http://google.com"

# Actions performed before each scenario
Before do |scenario|
  # Create browser instance variable
  @driver = driver
end