<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Fileman extends CI_Model {
  public function __construct(){
    parent::__construct();
  }

  public function getdirarr($dir){
    $list = array_diff(scandir($dir), array('.','..','deleted','favourites'));
    $files = array();
    foreach ($list as $file) {
      $files[] = array(
        'name'    => $file,
        'is_dir'  => is_dir($dir.'/'.$file),
        'is_img'  => @is_array(getimagesize($dir.'/'.$file))?true:false,
        'link'    => (@is_array(getimagesize($dir.'/'.$file))?true:false)?base_url().'upload/'.$this->session->uid.'/'.$this->input->get('depth').'/'.$file:null
      );
    }
    return $files;
  }
  public function mv($from,$to){
    if (rename($from,$to.'/'.basename($from))) return 1;
    else return 0;
  }
}
