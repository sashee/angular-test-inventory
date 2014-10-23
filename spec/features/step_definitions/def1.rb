Given(/^test$/) do
  puts 'test!'
  @driver.get('localhost:3000')
end

When(/^secondtest$/) do
  @driver.find_elements(:css,'.button-standard').first.click
end

Then(/^thirdtest$/) do
  @driver.find_element(:css,'.place-creator .place-editor-header').click
  @driver.find_elements(:css,'.place-creator .place-editor input').first.send_keys('test_name')
  @driver.find_elements(:css,'.place-creator .place-editor input').last.send_keys('test_desc')
  @driver.find_elements(:css,'.place-creator .place-editor .button-standard').first.click
end
