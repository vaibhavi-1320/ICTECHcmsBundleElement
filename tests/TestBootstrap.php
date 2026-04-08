<?php declare(strict_types=1);

use Shopware\Core\TestBootstrapper;

$loader = (new TestBootstrapper())
    ->addCallingPlugin()
    ->addActivePlugins('ICTECHcmsBundleElement')
    ->setForceInstallPlugins(true)
    ->bootstrap()
    ->getClassLoader();

$loader->addPsr4('ICTECHcmsBundleElement\\Tests\\', __DIR__);
