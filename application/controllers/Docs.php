<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Docs extends CI_Controller {
  public function __construct(){
    parent::__construct();
  }
  public function index(){
    $this->load->view('404-error');
  }
  public function termsncondn(){
    $this->load->view('tnc');
  }
}
