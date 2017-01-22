<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Shared extends CI_Controller {
  public function __construct(){
		parent::__construct();
	}
  public function index(){
    echo "Error with URL";
  }
  public function open($id){
    $sql = "SELECT * FROM `sharedlink` where `fileid`='$id'";
    $res = $this->db->query($sql);
    if($res->num_rows()){
      $row = $res->row();
      $this->load->model('fileman');
      $this->fileman->download($row->path);
    }
    else echo "Error with URL";
  }
}
