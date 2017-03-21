class ShareController < ApplicationController
  def top
    @userfiles = Userfile.find_by_sql(['select * from release_files order by updated_at'])
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
      p key
      userId=current_user.id
      @userfiles = Userfile.find_by_sql(['select * from release_files where tag = :key order by updated_at',{key: key}])
      p @userfiles
      render json: { :homearr => @userfiles } and return if request.xhr?
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

end
