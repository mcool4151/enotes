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
  public function openshared(){
    $id = $this->input->post('id');
    $depth = $this->input->post('subdir');
    echo json_encode($this->fileman->openswm($id,$depth));
  }
  public function copyshared(){
    $sid = $this->input->post('sid');
    $depth = $this->input->post('depth');
    $dest = $this->input->post('dest');
    $dest = $this->session->dir.$dest;
    $this->fileman->copyshared($sid,$depth,$dest);
  }
  public function getsharedwithgrouplist(){
    $this->load->model('groups');
    $file = $this->session->dir.$this->input->post('file');
    if(!$this->checkpath(realpath($this->session->dir),$file)){
      echo 0;
      return;
    }
    $res = $this->groups->getsharedwithgrouplist($file);
    echo json_encode($res);
  }
  public function removeshared(){
    $file = $this->session->dir.$this->input->post('file');
    $with = $this->input->post('email');
    $grp = $this->input->post('email');
    $with = $this->fileman->getid($with);
    if (!$this->checkpath(realpath($this->session->dir),$file)){
      echo "Error with File name";
    }
    else if (($with == $this->session->uid || $with == 0) && $this->checkgroup($grp) == 0){
      echo "Enterted Email/Group is invalid";
    }
    else if(($with == $this->session->uid || $with == 0) && $this->checkgroup($grp) != 0) {
      echo $this->fileman->revokefromGroup($file,$this->input->post('email'));
    }
    else{
      $this->fileman->revokefrom($file,$with);
    }
  }
  public function getdir(){
    if($this->input->get('depth')) {
      $dir = realpath($this->session->dir.$this->input->get('depth'));
      if(!$this->checkpath(realpath($this->session->dir),$dir)) exit(97);
      $arr = $this->fileman->getdirarr($dir.'/');
    }
    else $arr = $this->fileman->getdirarr($this->session->dir);
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
    $name = $_FILES['myfile']['name'];
    $i=1;
    $no = '';
    while(file_exists($depth.'/'.$no.$name) && !is_dir($depth.'/'.$no.$name)){
      $no = "($i)";
      $i = $i+1;
    }
    if(move_uploaded_file($_FILES['myfile']['tmp_name'],$depth.'/'.$no.$name)) echo 1;
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
      echo $this->fileman->mkdir($depth.'/'.$name);
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
    $type = $this->input->post('type');
    if($type == 0){
      $file = realpath($this->session->dir.$this->input->post('path'));
      if(!$this->checkpath(realpath($this->session->dir),$file)) {
        echo "error dir";
        return;
      }
      echo $this->fileman->addToDel($file);
    }
    else echo $this->fileman->removeFromDel($this->input->post('path'));
  }
  public function getdel(){
    echo json_encode($this->fileman->getDelAll());
  }
  public function checkshared(){
    $file = realpath($this->session->dir.$this->input->post('file'));
    if(!$this->checkpath(realpath($this->session->dir),$file)) {
      echo "error dir";
      return;
    }
    if($this->fileman->isShared($file)){
      $id = $this->fileman->getlink($file);
      $data = array(
        'isShared' => true,
        'link'     => $id
      );
      echo json_encode($data);
      return;
    }
    $data = array(
      'isShared' => false,
      'link'     => null
    );
    echo json_encode($data);
  }
  public function addtoshared(){
    $file = realpath($this->session->dir.$this->input->post('file'));
    if(!$this->checkpath(realpath($this->session->dir),$file)) {
      echo "error dir";
      return;
    }
    $this->fileman->makeShareLink($file);
  }
  public function remshared(){
    $file = realpath($this->session->dir.$this->input->post('file'));
    if(!$this->checkpath(realpath($this->session->dir),$file)) {
      echo "error dir";
      return;
    }
    $this->fileman->removeSharedLink($file);
  }
  public function checkuser(){
    $with = $this->input->post('uemail');
    $with = $this->fileman->getid($with);
    if($with == 0) echo 0;
    else echo 1;
  }
  public function sharewith(){
    $file = $this->session->dir.$this->input->post('file');
    $with = $this->input->post('uemail');
    $grp = $this->input->post('uemail');
    $with = $this->fileman->getid($with);
    if (!$this->checkpath(realpath($this->session->dir),$file)){
      echo "Error with File name";
    }
    else if (($with == $this->session->uid || $with == 0) && $this->checkgroup($grp) == 0){
      echo "Enterted Email/Group is invalid";
    }
    else if(($with == $this->session->uid || $with == 0) && $this->checkgroup($grp) != 0) {
      echo $this->fileman->sharewithGroup($file,$this->input->post('uemail'));
    }
    else if($this->fileman->alreadysharedwith($file,$with)){
      echo "The file is already shared with entered user";
    }
    else{
      $this->fileman->sharewith($file,$with);
      echo 1;
    }
  }
  public function getmygroups(){
    $this->load->model('groups');
    echo json_encode($this->groups->getmygroups());
  }
  public function getsubgroups(){
    $this->load->model('groups');
    echo json_encode($this->groups->getSubGroups());
  }
  public function getrestgroups(){
    $this->load->model('groups');
    echo json_encode($this->groups->getRestGroups());
  }
  public function creategroup(){
    $uniqname = $this->input->post('uniqname');
    if($this->checkgroup($uniqname)){
      echo "Group already exists, Please Enter a different Group Name";
      return;
    }
    $desc = $this->input->post('desc');
    $tags = $this->input->post('tags');
    $ispublic = 1;
    $id = $this->session->uid;
    echo $this->fileman->creategroup($id,$uniqname,$desc,$ispublic,$tags);
    $this->fileman->addToGroup($id,$uniqname);
  }
  public function addToGroup(){
    $group = $this->input->post('group');
    $email = $this->input->post('email');
    $id = $this->fileman->getid($email);
    $this->fileman->addToGroup($id,$group);
  }
  public function joinGroup(){
    $group = $this->input->post('group');
    $id = $this->session->uid;
    $this->fileman->joinGroup($id,$group);
  }
  public function leavegroup(){
    $group = $this->input->post('group');
    $id = $this->session->uid;
    $this->fileman->leaveGroup($id,$group);
  }
  public function checkgroup($name){
    return $this->fileman->checkgroup($name);
  }
  public function getsharedwithlist(){
    $file = $this->session->dir.$this->input->post('file');
    if(!$this->checkpath(realpath($this->session->dir),$file)){
      echo 0;
      return;
    }
    $res = $this->fileman->getsharedwithlist($file);
    echo json_encode($res);
  }
  public function getsharedwithme(){
    echo json_encode($this->fileman->getswm());
  }
  public function opengroup(){
    $uniq = $this->input->post('sid');
    $depth = $this->input->post('depth');
    $this->load->model('groups');
    echo json_encode($this->groups->loadGroup($uniq,$depth));
  }
  public function copygroup(){
    $sid = $this->input->post('sid');
    $depth = $this->input->post('depth');
    $dest = $this->input->post('dest');
    $dest = $this->session->dir.$dest;
    $this->load->model('groups');
    $this->groups->copygroupfile($sid,$depth,$dest);
  }
  public function showgroup(){
    $gname = $this->input->post('uniqName');
    $this->load->model('groups');
    echo json_encode($this->groups->showGroup($gname));
  }
  public function forevdel(){
    $file = $this->input->post('file');
    echo $this->fileman->deleteforever($file);
  }
}
