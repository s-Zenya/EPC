class FlashCardController < ApplicationController
  def index
    @user=@current_user
    if current_user.present?
      userId=current_user.id
      @userfiles=Userfile.find_by_sql(['select * from userfiles where user_id = :userid',{userid: userId}])
      fileName = params[:filename]
      p "----------------------------------------------------------"
      p fileName
        if !fileName.present?
          fileName=@userfiles[0].filename
        end
      id=Userfile.find_by_sql(['select id from userfiles where user_id=:userid and filename=:filename',{userid: userId,filename: fileName}])
      gon.cards=Word.find_by_sql(['select id,English,Japanese,Weak from words where fileid=:id',{id: id}])
      render json: { :homearr => gon.cards } and return if request.xhr?
    end
  end

  def flip
    data = []
    id = params[:id]
    weak = params[:weak]

    if(weak == '1')
      weak = true
    else
      weak = false
    end
    word = Word.new
    word = Word.find_by_sql(['select * from words where id = :id',{id: id}])
    word[0].Weak = weak
    word[0].save

    render :json => data
  end
end
