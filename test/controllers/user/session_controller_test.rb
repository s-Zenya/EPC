require 'test_helper'

class User::SessionControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get user_session_show_url
    assert_response :success
  end

  test "should get new" do
    get user_session_new_url
    assert_response :success
  end

end
