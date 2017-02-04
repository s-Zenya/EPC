class FlashCardController < ApplicationController
  def index
    @user=@current_user
    userId=current_user.id

    @userfiles=Userfile.find_by_sql(['select * from userfiles where user_id = :userid',{userid: userId}])
        # p "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+@userfiles.to_s+"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
  end
  def findCards
    fileName = params[:filename]
    # p "@@@@@@@@@@fileName@@"+ fileName +"@@@@@@@@@@@@@@"
    userId=current_user.id

    id=Userfile.find_by_sql(['select id from userfiles where user_id=:userid and filename=:filename',{userid: userId,filename: fileName}])
    @cards=Word.find_by_sql(['select English,Japanese from words where fileid=:id',{id: id}])
    
    # p @cards.to_a
    #
    @cards.each do |result|
      p result.English
      p result.Japanese
    end

    # p fileName
    # p current_user.id
    # p "aaaaaaaaaausrIdaa"+id.to_s+"aaaaaaaaaaaaaaa"
  end
end
