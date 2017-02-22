class User::SessionController < ApplicationController
  skip_before_action :authenticate, except: :show

  def show
    @user=current_user
  end

  def new
    @user=current_user
  end

  def create
    @user=current_user
    user = User.find_by(user_params_name)
      if user && user.authenticate(user_params_password[:password])
        session[:user_id] = user.id
        redirect_to root_path
      else
        respond_to do |format|
        format.html { redirect_to '/user/sign_in', alert: 'ログイン失敗' }
        format.json { redirect_to '/user/sign_in', status: :ok, location: @user }
      end
      end
  end

  def destroy
    @user=current_user
    session.delete :user_id
    redirect_to root_path
  end

  private
    def user_params_name
      params.permit(:name)
    end
    def user_params_password
      params.permit(:password)
    end
end
