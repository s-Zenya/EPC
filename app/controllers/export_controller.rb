class ExportController < ApplicationController
  def index
    
  end

  def create
    english_words = params[:english_words]
    japanese_words = params[:japanese_words]
    title = params[:title]
    data = []
    p title
    p "うおああああああああああああああああああああああああああああああああああああああああああああああああああああああ"
    if Userfile.find_by_sql(['select * from userfiles where filename = :title',{title: title}]) == []
      @userfiles = Userfile.new;
      @userfiles.user_id = session[:user_id]
      @userfiles.filename = title
      i = 0
      for english in english_words do
        @words = Word.new;
        @words.fileid = @userfiles.id
        @words.English = english
        @words.Japanese = japanese_words[i]
        @words.Weak = false
        @userfiles.save
        @words.save
        i += 1
      end
      render :json => data
    else
      render status: 401
    end
  end
end
