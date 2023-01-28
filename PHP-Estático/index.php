<?php

class MountToStatic {

    public function __construct() {
        $this->mount();
    }

    public function mount() {
        $articles_path = "articles/";
        $static_path = "static/";

        $header = file_get_contents("components/html/header.html");
        $footer = file_get_contents("components/html/footer.html");

        $articles = scandir($articles_path);
        foreach ($articles as $article) {
            if ($article != "." && $article != "..") {
                $article_content = file_get_contents("$articles_path$article");
                $article_content = $header . $article_content . $footer;

                $static_file = fopen("$static_path$article", "w");
                fwrite($static_file, $article_content);
                fclose($static_file);

                echo "$article gravado com sucesso na pasta static<br>";
            }
        }
    }
}

$mount = new MountToStatic();
