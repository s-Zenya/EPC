class ExportController < ApplicationController
  def index
  end

  def create
    english_words = params[:english_words]
    japanese_words = params[:japanese_words]
    title = params[:title]
    user_id = session[:user_id]
    data = []
    if Userfile.find_by_sql(['select * from userfiles where filename = :title && user_id = :user_id',{title: title, user_id: user_id}]) == []
      @userfiles = Userfile.new;
      @userfiles.user_id = user_id
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
