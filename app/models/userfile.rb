class Userfile < ApplicationRecord
  validates :filename, presence: true
  belongs_to :user
end
