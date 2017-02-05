class FlashCardController < ApplicationController
  def index
    @user=@current_user
    userId=current_user.id
    gon.cards="aaa"
    @userfiles=Userfile.find_by_sql(['select * from userfiles where user_id = :userid',{userid: userId}])
    fileName = params[:filename]
    p "ここから"
    p fileName
    if !fileName.present?
      p "null                        null"
      fileName=@userfiles[0].filename
    end
    id=Userfile.find_by_sql(['select id from userfiles where user_id=:userid and filename=:filename',{userid: userId,filename: fileName}])
    gon.cards=Word.find_by_sql(['select English,Japanese from words where fileid=:id',{id: id}])
    p gon.cards
    @aaa=gon.cards[0].Japanese
  end
end
