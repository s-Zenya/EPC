require 'test_helper'

class UserfilesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @userfile = userfiles(:one)
  end

  test "should get index" do
    get userfiles_url
    assert_response :success
  end

  test "should get new" do
    get new_userfile_url
    assert_response :success
  end

  test "should create userfile" do
    assert_difference('Userfile.count') do
      post userfiles_url, params: { userfile: {  } }
    end

    assert_redirected_to userfile_url(Userfile.last)
  end

  test "should show userfile" do
    get userfile_url(@userfile)
    assert_response :success
  end

  test "should get edit" do
    get edit_userfile_url(@userfile)
    assert_response :success
  end

  test "should update userfile" do
    patch userfile_url(@userfile), params: { userfile: {  } }
    assert_redirected_to userfile_url(@userfile)
  end

  test "should destroy userfile" do
    assert_difference('Userfile.count', -1) do
      delete userfile_url(@userfile)
    end

    assert_redirected_to userfiles_url
  end
end
