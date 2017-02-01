class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  protect_from_forgery with: :exception
  helper_method :current_user

  def current_user
    if session[:user_id].present?
      @current_user ||= User.find(session[:user_id])
    end
  end

  def append_info_to_payload(payload)
    super
    payload[:host] = request.host
    payload[:username] = current_user.try(:username)
    payload[:userpass] = current_user.try(:userpass)
  end
end
