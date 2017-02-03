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
    if user.present?
      logger.debug("ooooooooooooooooooooooooooooooooooooooooooo"+user_params_password[:userpassword]+"QQQ")
      if user.Userpassword == user_params_password[:userpassword]
        session[:user_id] = user.id
        redirect_to root_path
      else
        render :new
      end
    else
      render :new
    end
  end

  def destroy
    @user=current_user
    session.delete :user_id
    redirect_to root_path
  end

  private
    def user_params_name
      params.permit(:username)
    end
    def user_params_password
      params.permit(:userpassword)
    end
end
