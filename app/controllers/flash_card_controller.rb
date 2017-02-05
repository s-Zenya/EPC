class FlashCardController < ApplicationController
  def index
    @user=@current_user
    userId=current_user.id
    @userfiles=Userfile.find_by_sql(['select * from userfiles where user_id = :userid',{userid: userId}])
    fileName = params[:filename]
    p "----------------------------------------------------------"
    p fileName
    if !fileName.present?
      fileName=@userfiles[0].filename
    end
    id=Userfile.find_by_sql(['select id from userfiles where user_id=:userid and filename=:filename',{userid: userId,filename: fileName}])
    gon.cards=Word.find_by_sql(['select English,Japanese from words where fileid=:id',{id: id}])
    render json: { :homearr => gon.cards } and return if request.xhr?
  end
end
