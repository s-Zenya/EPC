class ReleaseFile < ApplicationRecord
  validates :filename, presence: true
end
