class EditingController < ApplicationController
  def index
    if current_user.present?
      userId=current_user.id
      @userfiles=Userfile.find_by_sql(['select * from userfiles where user_id = :userid',{userid: userId}])
    end
  end

  def delete
    data = []
    userId=current_user.id
    fileName = params[:filename]
    if fileName.present?
      id=Userfile.find_by_sql(['select id from userfiles where user_id=:userid and filename=:filename',{userid: userId,filename: fileName}])
      Userfile.destroy_all(['user_id = :userid and filename = :filename',{userid: userId,filename: fileName}])
      Word.destroy_all(['fileid = :id',{id: id}])
      render :json => data
    else
      p "失敗"
    end
  end


  def edit
  end
end
