# coding: utf-8
class TopController < ApplicationController
  def index
    @user=current_user
  end
end
