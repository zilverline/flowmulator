require "rack"
require "capybara"
require "capybara/dsl"
require 'capybara/rspec'

Capybara.app = Rack::Builder.parse_file(File.expand_path('../../config.ru', __FILE__)).first
Capybara.default_driver = :selenium
Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome, :switches => %w[--disable-translate])
end
Capybara.default_wait_time = 3

RSpec.configure do |config|
  config.include Capybara::DSL
end