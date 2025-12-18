<?php

$finder = (new PhpCsFixer\Finder())
    ->in(__DIR__)
    ->exclude('assets')
    ->exclude('bin')
    ->exclude('config')
    ->exclude('migrations')
    ->exclude('node_modules')
    ->exclude('public/bundles')
    ->exclude('public/build')
    ->exclude('var')
    ->exclude('vendor');

return (new PhpCsFixer\Config())
    ->setRules([
        '@Symfony' => true,
        'array_syntax' => ['syntax' => 'short'],
        'ordered_imports' => ['sort_algorithm' => 'alpha'],
        'no_unused_imports' => true,
    ])
    ->setFinder($finder);
