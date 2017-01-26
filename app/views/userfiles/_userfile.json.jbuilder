json.extract! userfile, :id, :created_at, :updated_at
json.url userfile_url(userfile, format: :json)