class DotsController < ApplicationController
  before_action :get_new_dots, only: [:create, :destroy]

  def index
    @dots = Dot.all
    respond_to do |format|
      format.json { render json: @dots }
      format.html {  }
    end
  end

  def create
    Dot.create(dot_params)
    render json: @new_dots
  end

  def destroy
    dot = Dot.destroy(params[:id])
    render json: {dot: dot, new_dots: @new_dots}
  end

  private

  def dot_params
    params.require(:dot).permit(:x,:y,:color)
  end

  def get_new_dots
    @new_dots = Dot.find_new_dots(params[:last_dot_id])
  end

end
