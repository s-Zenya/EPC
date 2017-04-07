class ShareController < ApplicationController
  def top
    @userfiles = Userfile.find_by_sql(['select * from release_files order by updated_at desc'])
  end

  def index
    if current_user.present?
      userId=current_user.id
      @userfiles=Userfile.find_by_sql(['select * from userfiles where user_id = :userid',{userid: userId}])
    end
  end

  def search
    if current_user.present?
      key = params[:key]
      p 'hahahahaha'
      p key
      userId=current_user.id
      @userfiles = Userfile.find_by_sql(['select * from release_files where tag = :key order by updated_at',{key: key}])
      p @userfiles
    end
  end

  def edit
    userId=current_user.id
    fileId = params[:fileId]
    @userfiles=Userfile.find_by_sql(['select * from userfiles where user_id = :userid and id = :id',{userid: userId, id: fileId}])
    @release_file = ReleaseFile.new;
    @release_file.userfiles_id = fileId
    @release_file.filename =@userfiles[0].filename
  end

  def create
    respond_to do |format|
    @release_file = ReleaseFile.new(params[:release_file])
    p @release_file
      if @release_file.save
        format.html { redirect_to '/share/create', notice: 'ファイルを公開しました' }
        format.json { redirect_to '/share/create', status: :ok, location: @release_file }
      end
      format.html { render :index }
      format.json { render json: @release_file.errors, status: :unprocessable_entity }
    end
  end

  def show
    @release_file = ReleaseFile.find_by(id: params[:id])
    # 秒の切り捨て
    Time.at(@release_file.updated_at.to_i / 60 * 60) # => 2013-04-04 12:34:00 +0900
    file = Userfile.find_by(id: @release_file.userfiles_id)
    p file
    @releasing_user = User.find_by(id: file.user_id)
    @userfile = Userfile.new
    @userfile.user_id = session[:user_id]
    @userfile.filename = @release_file.filename
    @user = User.find_by(id: @userfile.user_id)
    @words = Word.where(fileid: @release_file.id)
    p @user
    p  "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
    p @words
  end
end
