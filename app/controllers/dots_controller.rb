class DotsController < ApplicationController

  def index
    @dots = Dot.all
    respond_to do |format|
      format.json { render json: @dots }
      format.html {  }
    end
  end

  def create
    dot = Dot.create(dot_params)
    render json: dot
  end

  def destroy
    Dot.destroy(params[:id])
    render nothing: true
  end

  private

  def dot_params
    params.require(:dot).permit(:x,:y,:color)
  end
end
