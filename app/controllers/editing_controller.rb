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
      render :json => data
    else
      render status: 401
    end
  end
end
