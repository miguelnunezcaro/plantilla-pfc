<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInit49c66db5f7d25fe4d3f6e1e25c13e1fe
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        require __DIR__ . '/platform_check.php';

        spl_autoload_register(array('ComposerAutoloaderInit49c66db5f7d25fe4d3f6e1e25c13e1fe', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInit49c66db5f7d25fe4d3f6e1e25c13e1fe', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInit49c66db5f7d25fe4d3f6e1e25c13e1fe::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
