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
  public function mkdir($path){
      return mkdir($path,0777,false);
  }
  public function download($file){
    if(!is_dir($file)){
      if (file_exists($file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.basename($file).'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file));
        readfile($file);
        exit;
      }
    }
    else{

    }
  }
  public function getlink($path){
    $res = $this->db->query("select * from sharedlink where path=$path");
    //if($res->num_rows())
  }
}
