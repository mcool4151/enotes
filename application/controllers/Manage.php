<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Manage extends CI_Controller {
  public function __construct(){
		parent::__construct();
		if(!($this->session->loggedin == 1)){
			redirect('login');
		}
	}
  public function index(){
    $this->load->view('manage-page');
  }
  public function getdir(){
    $this->load->model('fileman');
    if(isset($_GET['depth'])) {
      $dir = realpath($this->session->dir.$_GET['depth']);
      if(!$this->checkpath(realpath($this->session->dir),$dir)) exit(97);
    }
    else $dir = $this->session->dir;
    echo json_encode($this->fileman->getdirarr($dir));
  }
  private function checkpath($base,$test){
    if(!strncmp($test,$base,strlen($base))) return 1;
    else return 0;
  }
  public function logout(){
    $this->session->sess_destroy();
    redirect('login');
  }
  public function upload(){
    if(move_uploaded_file($_FILES['myfile']['tmp_name'],$this->session->dir.$_FILES['myfile']['name'])) echo 1;
    else echo 0;
  }
}
