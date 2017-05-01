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
    ReleaseFile.destroy_all(['userfiles_id = :id',{id: fileId}])
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
    id = params[:id]
    english_words = params[:english_words]
    japanese_words = params[:japanese_words]
    title = params[:title]
    data = []
    if Userfile.find_by_sql(['select * from userfiles where filename = :title and id != :id',{title: title, id: id}]) == []
      Userfile.destroy_all(['id = :id',{id: id}])
      Word.destroy_all(['fileid = :id',{id: id}])
      @userfiles = Userfile.new;
      @userfiles.user_id = session[:user_id]
      @userfiles.filename = title
      @userfiles.save
      i = 0
      for english in english_words do
        @words = Word.new;
        @words.fileid = @userfiles.id
        @words.English = english
        @words.Japanese = japanese_words[i]
        @words.Weak = false
        @words.save
        i += 1
      end
      @ReleaseFile = ReleaseFile.where(['userfiles_id = :id',{id: id}])
      if @ReleaseFile!=[]
        newId=Userfile.find_by(filename:title)
        @ReleaseFile[0].userfiles_id=newId.id
        @ReleaseFile[0].save
      end
      render :json => data
    else
      render status: 401
    end
  end

  def toJson
    userId=current_user.id
    fileId = params[:fileId]
    userfile = Userfile.find_by_sql(['select * from userfiles where id = :id and user_id = :user',{id: fileId,user: userId}])
    words = Word.find_by_sql(['select English,Japanese from words where fileId = :fileId',{fileId: fileId}])
    file = [{"words":words},{"filename": userfile[0].filename}]
    render json: { :homearr => file } and return if request.xhr?
  end
end
