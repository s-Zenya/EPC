class ExportController < ApplicationController
  def index
    @user=current_user
  end

  def create
    english_words = params[:english_words]
    japanese_words = params[:japanese_words]

    @userfiles = Userfile.new;
    @userfiles.user_id = session[:user_id]
    @userfiles.filename = params[:title]
    @userfiles.save

    p japanese_words
    i = 0
    for english in english_words do
      @words = Word.new;
      @words.fileid = @userfiles.id
      @words.English = english
      @words.Japanese = japanese_words[i]
      @words.save
      i += 1
    end

    data = []
    render :json => data
  end
end
