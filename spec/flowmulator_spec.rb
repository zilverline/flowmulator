require 'spec_helper'

describe "Flowmulator" do

  it "should show a list of work items" do
    visit '/index.html'
    page.should have_css("#backlog li", count: 4)
    work_items = page.find("#backlog li")
    work_items.should have_content("Feature #1")
    work_items.should have_content("Analysis: 3")
    work_items.should have_content("Design: 3")
    work_items.should have_content("Code: 5")
    work_items.should have_content("Test: 3")
    work_items.should have_content("Release: 2")
  end

  it "should show an empty work in progress board" do
    visit '/index.html'
    page.should have_css("#board li", count: 5)
    board_columns = page.find("#board")
    board_columns.should have_content("Analysis")
    board_columns.should have_content("Design")
    board_columns.should have_content("Code")
    board_columns.should have_content("Test")
    board_columns.should have_content("Release")
    first_column = page.find("#board li:first-child")
    first_column.should have_content("Velocity: 0")
  end

  it "should run one day" do
    visit '/index.html'
    click_on "Run one day"

  end

end