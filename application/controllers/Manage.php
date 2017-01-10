<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Manage extends CI_Controller {
  public $files;
  public function __construct(){
		parent::__construct();
		if(!($this->session->loggedin == 1)){
			redirect('login');
		}
    $this->load->model('fileman');
	}
  public function index(){
    $this->load->view('manage-page');
  }
  public function getdir(){
    if($this->input->get('depth')) {
      $dir = realpath($this->session->dir.$this->input->get('depth'));
      if(!$this->checkpath(realpath($this->session->dir),$dir)) exit(97);
      $arr = $this->fileman->getdirarr($dir);
    }
    else {
      $arr = array_merge($this->fileman->getdirarr($this->session->dir),
        $this->fileman->getdirarr($this->session->dir.'favourites'));
    }
    function mycmp($a,$b){
      return strcasecmp($a['name'],$b['name']);
    }
    usort($arr,"mycmp");
    echo json_encode($arr);
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
    $depth = realpath($this->session->dir.$this->input->post('depth'));
    if(!($this->checkpath(realpath($this->session->dir),$depth))) {
      echo "Error dir";
      return;
    }
    if(move_uploaded_file($_FILES['myfile']['tmp_name'],$depth.'/'.$_FILES['myfile']['name'])) echo 1;
    else echo 0;
  }
  public function move(){
    $src  = realpath($this->session->dir.$this->input->post('src'));
    $dest = realpath($this->session->dir.$this->input->post('dest'));
    if(!($this->checkpath(realpath($this->session->dir),$src) && $this->checkpath(realpath($this->session->dir),$dest))){
      echo "error with dir";
      return;
    }
    echo $this->fileman->mv($src,$dest);
  }
  public function rename(){
    $depth = realpath($this->session->dir.$this->input->post('depth'));
    $dest = $this->input->post('dest');
    if($this->input->post('depth') == '')$src = realpath($this->session->dir.$this->input->post('src'));
    else $src = realpath($this->session->dir.$this->input->post('depth').'/'.$this->input->post('src'));
    if(!($this->checkpath(realpath($this->session->dir),$src))){
      echo "error with dir";
      return;
    }
    echo $this->fileman->rn($src,$depth.'/'.basename($dest));
  }
  public function createdir(){
    $name = basename($this->input->post('name'));
    $depth = realpath($this->session->dir.$this->input->post('depth'));
    if(!($this->checkpath(realpath($this->session->dir),$depth))) {
      echo "Error dir";
      return;
    }else{
      if(!mkdir($depth.'/'.$name)) echo 0;
      else echo 1;
    }
  }
  public function setdownload(){
    if($this->input->post('depth') == '')$path = realpath($this->session->dir.$this->input->post('name'));
    else $path = realpath($this->session->dir.$this->input->post('depth').'/'.$this->input->post('name'));
    if(!$this->checkpath($this->session->dir,$path)){
      echo "Path error";
    }
    else {
      echo 1;
      $this->session->file = $path;
    }
  }
  public function download(){
    $this->fileman->download($this->session->file);
  }
  public function getsharelink(){
    $_POST['file'] = '';
    $path = realpath($this->session->dir.$this->input->post('file'));
    if(!checkpath(realpath($this->session->dir),$path)) {
      echo "invalid path";
      return;
    }
  }
  public function flipfav(){
    $file = realpath($this->session->dir.$this->input->post('path'));
    if(!$this->checkpath(realpath($this->session->dir),$file)) {
      echo "error dir";
      return;
    }
    if(!$this->fileman->checkfav($file)) $this->fileman->addToFav($file);
    else $this->fileman->removeFromFav($file);
  }
  public function getfav(){
    echo json_encode($this->fileman->getFavAll());
  }
  public function flipdel(){
    $file = realpath($this->session->dir.$this->input->post('path'));
    if(!$this->checkpath(realpath($this->session->dir),$file)) {
      echo "error dir";
      return;
    }
    if(!$this->fileman->checkfav($file)) $this->fileman->addToDel($file);
    else $this->fileman->removeFromDel($file);
  }
  public function getfav(){
    echo json_encode($this->fileman->getDelAll());
  }
}
