class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user
  before_action :authenticate

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

  private
   def authenticate
     if current_user.blank? #userが存在するかの確認
       session.delete :user_id
     end
   end
end
