<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Fileman extends CI_Model {
  public function __construct(){
    parent::__construct();
  }

  public function getdirarr($dir){
    $list = array_diff(scandir($dir), array('.','..','deleted'));
    $files = array();
    foreach ($list as $file) {
      $files[] = array(
        'name' => $file,
        'is_dir' => is_dir($dir.'/'.$file)
      );
    }
    return $files;
  }

}
