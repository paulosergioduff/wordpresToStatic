
<?php 

class WordpressToHtml {
    public function convert() {
        // Lê o conteúdo do json da API do Wordpress
        $json = file_get_contents('https://fortplanos.com.br/wp-json/wp/v2/posts/');
        $posts = json_decode($json);

        // Percorre cada post do json
        foreach ($posts as $post) {
            // Monta o html com o título e conteúdo
            $html = '<h1>' . $post->title->rendered . '</h1>';
            $html .= $post->content->rendered;

            // Salva o arquivo na pasta articles
            $file = fopen('posts/' . $post->slug . '.html', 'w');
            fwrite($file, $html);
            fclose($file);

            // Emite uma mensagem de sucesso
            echo $post->slug . '.html gravado com sucesso<br>' . PHP_EOL;
        }
    }
}

// Usando a classe
$converter = new WordpressToHtml();
$converter->convert();


