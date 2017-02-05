class FlashCardController < ApplicationController
  def index
    if @current_user.blank?
    else
      @user=@current_user
      userId=current_user.id

      @userfiles=Userfile.find_by_sql(['select * from userfiles where user_id = :userid',{userid: userId}])
    end

  end
end
