class User::SessionController < ApplicationController
  skip_before_action :authenticate, except: :show

  def show
  end

  def new
  end

  def create
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
