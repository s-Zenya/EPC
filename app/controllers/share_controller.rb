class ShareController < ApplicationController
  def index
    @userfiles = Userfile.find_by_sql(['select * from release_files order by updated_at'])
  end

  def create
    if current_user.present?
      userId=current_user.id
      @userfiles=Userfile.find_by_sql(['select * from userfiles where user_id = :userid',{userid: userId}])
    end
  end

  def edit
    fileId = params[:fileId]
    @release_files = ReleaseFile.new;
    @release_files.userfiles_id = fileId
    p @release_files
  end

end
