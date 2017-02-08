class UserfilesController < ApplicationController
  before_action :set_userfile, only: [:show, :edit, :update, :destroy]

  # GET /userfiles
  # GET /userfiles.json
  def index
    @userfiles = Userfile.all
  end

  # GET /userfiles/1
  # GET /userfiles/1.json
  def show
  end

  # GET /userfiles/new
  def new

  end

  # GET /userfiles/1/edit
  def edit
  end

  # POST /userfiles
  # POST /userfiles.json
  def create
    @userfile = Userfile.new(userfile_params)

    respond_to do |format|
      if @userfile.save
        format.html { redirect_to @userfile, notice: 'Userfile was successfully created.' }
        format.json { render :show, status: :created, location: @userfile }
      else
        format.html { render :new }
        format.json { render json: @userfile.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /userfiles/1
  # PATCH/PUT /userfiles/1.json
  def update
    respond_to do |format|
      if @userfile.update(userfile_params)
        format.html { redirect_to @userfile, notice: 'Userfile was successfully updated.' }
        format.json { render :show, status: :ok, location: @userfile }
      else
        format.html { render :edit }
        format.json { render json: @userfile.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /userfiles/1
  # DELETE /userfiles/1.json
  def destroy
    @userfile.destroy
    respond_to do |format|
      format.html { redirect_to userfiles_url, notice: 'Userfile was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_userfile
      @userfile = Userfile.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def userfile_params
      params.fetch(:userfile, {})
    end
end
