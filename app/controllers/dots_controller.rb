class DotsController < ApplicationController
  def index
    @dots = Dot.all
  end

  def create
    Dot.create(dot_params)
    render nothing: true
  end

  private

  def dot_params
    params.require(:dot).permit(:x,:y)
  end
end
