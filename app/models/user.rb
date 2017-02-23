class User < ApplicationRecord
  has_secure_password
  validates :name, presence: true, uniqueness: true, length: { maximum: 10 }
  validates :address, presence: true
  validates :password, presence: true, length: { maximum: 15 }
end
