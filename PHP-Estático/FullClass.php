<?php 

class MountToStatic {
    private $path;
    private $header;
    private $footer;

    public function __construct($path, $header, $footer) {
        $this->path = $path;
        $this->header = $header;
        $this->footer = $footer;
    }

    public function getJson($url) {
        $json = file_get_contents($url);
        $data = json_decode($json);
        return $data;
    }

    public function mountAndSave($data) {
        foreach($data as $item) {
            $slug = $item->slug;
            $title = $item->title->rendered;
            $content = $item->content->rendered;
            $html = $this->header . $title . $content . $this->footer;
            $file = fopen($this->path . $slug . ".html", "w");
            fwrite($file, $html);
            fclose($file);
            echo $slug . ".html gravado com sucesso" . PHP_EOL;
        }
    }

    public function mountFromArticles(){
        $files = scandir($this->path);
        foreach($files as $file){
            if(strpos($file, ".html")){
                $html = file_get_contents($this->path . $file);
                $newHtml = $this->header . $html . $this->footer;
                $newFile = fopen("static/".$file, "w");
                fwrite($newFile, $newHtml);
                fclose($newFile);
                echo $file . " foi movido para static/ com sucesso" . PHP_EOL;
            }
        }
    }
}

// Exemplo de uso:

$mount = new MountToStatic("articles/", file_get_contents("components/html/header.html"), file_get_contents("components/html/footer.html"));

//Usando a função mountAndSave
$data = $mount->getJson("http://localhost/wp-json/wp/v2/posts/");
$mount->mountAndSave($data);

//Usando a função mountFromArticles
$mount->mountFromArticles();
