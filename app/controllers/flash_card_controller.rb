class FlashCardController < ApplicationController
  def index
    @user=@current_user
    userId=current_user.id

    @userfiles=Userfile.find_by_sql(['select * from userfiles where user_id = :userid',{userid: userId}])
        p "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+@userfiles.to_s+"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

  end
end
