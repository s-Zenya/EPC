class EditingController < ApplicationController
  def index
    if current_user.present?
      userId=current_user.id
      @userfiles=Userfile.find_by_sql(['select * from userfiles where user_id = :userid',{userid: userId}])
    end
  end

  def delete
    data = []
    fileId = params[:fileId]
    Userfile.destroy_all(['id = :id',{id: fileId}])
    Word.destroy_all(['fileid = :id',{id: fileId}])
    render :json => data
  end

  def edit
    fileId = params[:fileId]
    p fileId
    @userfile = Userfile.find_by_sql(['select * from userfiles where id = :id',{id: fileId}])
    p @userfile[0].filename
    @words = Word.find_by_sql(['select * from words where fileId = :fileId',{fileId: fileId}])
  end

  def update

  end
end
