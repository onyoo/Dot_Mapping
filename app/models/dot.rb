class Dot < ActiveRecord::Base

  def self.find_new_dots(last_dot_id)
    if last_dot_id != nil
      where("id > ?", [last_dot_id])
    else
      all
    end
  end
end
